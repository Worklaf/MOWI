async function processAllLinesOCR(allLinesCanvas) {
    try {
        const ocrLang = ocrLangMap[currentLang] || 'pol';
        
        // СОЗДАЕМ ДВА ИЗОБРАЖЕНИЯ: одно для текста, другое для цифр
        
        // 1. Распознаем весь текст для номеров партий
        const textResult = await Tesseract.recognize(
            allLinesCanvas,
            'eng',
            { 
                tessedit_ocr_engine_mode: 1,
                tessedit_pageseg_mode: 6,
                preserve_interword_spaces: '1',
                tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/L'
            }
        );
        
        // 2. Создаем высококонтрастное изображение для цифр
        const contrastCanvas = createContrastCanvas(allLinesCanvas);
        
        // 3. Распознаем цифры с контрастного изображения
        const numberResult = await Tesseract.recognize(
            contrastCanvas,
            'eng',
            { 
                tessedit_ocr_engine_mode: 1,
                tessedit_pageseg_mode: 6,
                tessedit_char_whitelist: '0123456789'
            }
        );
        
        console.log('🔍 OCR текст:', textResult.data.text);
        console.log('🔍 OCR цифры (контраст):', numberResult.data.text);
        
        // Разделяем на строки
        const textLines = textResult.data.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const numberLines = numberResult.data.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        console.log('🔍 Текстовые строки:', textLines);
        console.log('🔍 Цифровые строки:', numberLines);
        
        // Создаем массив пар {qrCode, batchNumber}
        const resultArray = [];
        
        for (let i = 0; i < Math.min(textLines.length, numberLines.length); i++) {
            const textLine = textLines[i];
            const numberLine = numberLines[i];
            
            console.log(`🔍 Анализ строки ${i}: текст="${textLine}", цифры="${numberLine}"`);
            
            // Ищем QR код по строгому шаблону: начинается с 0015 и содержит 20 цифр
            const qrMatch = numberLine.match(/(0015\d{16})/); // 0015 + 16 цифр = 20 всего
            
            // Ищем номер партии по шаблонам: L/1325/26/GGC или L/1425/26/GGASCT1C
            const batchMatch = textLine.match(/(L\/\d+\/\d+\/[^\s\|\]\[]+)/);
            
            if (qrMatch) {
                const qrCode = qrMatch[1];
                const batchNumber = batchMatch ? batchMatch[1] : '';
                
                resultArray.push({
                    qrCode: qrCode,
                    batchNumber: batchNumber
                });
                
                console.log(`✅ Найдено: QR=${qrCode}, Партия=${batchNumber || 'нет'}`);
            }
        }
        
        console.log(`🎉 Итого найдено: ${resultArray.length} кодов`);
        return resultArray;
        
    } catch (err) {
        console.error('❌ OCR ошибка:', err);
        return [];
    }
}

function createContrastCanvas(originalCanvas) {
    const contrastCanvas = document.createElement('canvas');
    const contrastCtx = contrastCanvas.getContext('2d');
    
    contrastCanvas.width = originalCanvas.width;
    contrastCanvas.height = originalCanvas.height;
    
    // Копируем изображение
    contrastCtx.drawImage(originalCanvas, 0, 0);
    
    // Получаем данные изображения
    const imageData = contrastCtx.getImageData(0, 0, contrastCanvas.width, contrastCanvas.height);
    const data = imageData.data;
    
    // Увеличиваем контраст: делаем все темное - черным, все светлое - белым
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Вычисляем яркость
        const brightness = (r + g + b) / 3;
        
        // Порог для бинаризации
        const threshold = 128;
        
        if (brightness < threshold) {
            // Темное - делаем черным
            data[i] = 0;     // R
            data[i + 1] = 0; // G
            data[i + 2] = 0; // B
        } else {
            // Светлое - делаем белым
            data[i] = 255;     // R
            data[i + 1] = 255; // G
            data[i + 2] = 255; // B
        }
        // Альфа канал не меняем
    }
    
    // Возвращаем обработанное изображение
    contrastCtx.putImageData(imageData, 0, 0);
    
    return contrastCanvas;
}
