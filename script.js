
        $(document).ready(function() {
            // Словник для вивчення
            const wordDictionary = [
                { word: "apple", translation: "яблуко" },
                { word: "book", translation: "книга" },
                { word: "cat", translation: "кіт" },
                { word: "dog", translation: "собака" },
                { word: "house", translation: "будинок" },
                { word: "water", translation: "вода" },
                { word: "sun", translation: "сонце" },
                { word: "moon", translation: "місяць" },
                { word: "tree", translation: "дерево" },
                { word: "car", translation: "автомобіль" },
                { word: "computer", translation: "комп'ютер" },
                { word: "phone", translation: "телефон" },
                { word: "friend", translation: "друг" },
                { word: "family", translation: "сім'я" },
                { word: "school", translation: "школа" },
                { word: "age", translation: "вік" },
                { word: "food", translation: "їжа" },
                { word: "vegetables", translation: "овочі" },
                { word: "bathroom", translation: "ванна кімната" },
                { word: "kitchen", translation: "кухня" },
                { word: "work", translation: "працювати" },
                { word: "fruit", translation: "фрукти" },
                { word: "sing", translation: "співати" },
                { word: "teach", translation: "навчати" },
                { word: "choose", translation: "обирати" }
            ];
            
            // Змінні стану
            let currentWords = [];
            let currentIndex = 0;
            let correctAnswers = 0;
            let incorrectAnswers = 0;
            let totalWords = 10;
            
            // Ініціалізація гри
            function initGame() {
                // Вибір випадкових слів
                currentWords = getRandomWords(wordDictionary, totalWords);
                currentIndex = 0;
                correctAnswers = 0;
                incorrectAnswers = 0;
                
                updateStats();
                showCurrentWord();
                $("#result-message").text("");
                $("#next-btn").hide();
                $("#check-btn").show();
                $("#translation-input").prop('disabled', false);
            }
            
            // Отримати випадкові слова зі словника
            function getRandomWords(dictionary, count) {
                const shuffled = [...dictionary].sort(() => 0.5 - Math.random());
                return shuffled.slice(0, count);
            }
            
            // Показати поточне слово
            function showCurrentWord() {
                $("#current-word").text(currentWords[currentIndex].word);
                $("#translation-input").val("");
                $("#result-message").text("");
            }
            
            // Оновити статистику
            function updateStats() {
                $("#current-step").text(currentIndex + 1);
                $("#correct-count").text(correctAnswers);
                $("#incorrect-count").text(incorrectAnswers);
            }
            
            // Перевірити відповідь
            function checkAnswer() {
                const userAnswer = $("#translation-input").val().trim().toLowerCase();
                const correctAnswer = currentWords[currentIndex].translation.toLowerCase();
                
                if (userAnswer === correctAnswer) {
                    correctAnswers++;
                    $("#result-message").text("Правильно!").removeClass("incorrect").addClass("correct");
                } else {
                    incorrectAnswers++;
                    $("#result-message").text(`Неправильна відповідь. Правильно: ${currentWords[currentIndex].translation}`).removeClass("correct").addClass("incorrect");
                }
                
                updateStats();
                
                // Показати кнопку "Далі" і сховати кнопку "Перевірити"
                $("#next-btn").show();
                $("#check-btn").hide();
                $("#translation-input").prop('disabled', true);
            }
            
            // Перейти до наступного слова
            function nextWord() {
                currentIndex++;
                
                if (currentIndex < totalWords) {
                    showCurrentWord();
                    $("#next-btn").hide();
                    $("#check-btn").show();
                    $("#translation-input").prop('disabled', false);
                } else {
                    showResults();
                }
            }
            
            // Показати результати
            function showResults() {
                $("#modal-correct").text(correctAnswers);
                $("#modal-incorrect").text(incorrectAnswers);
                
                // Визначення рівня знань
                const percentage = (correctAnswers / totalWords) * 100;
                let level = "";
                
                if (percentage >= 90) {
                    level = "Експерт";
                } else if (percentage >= 70) {
                    level = "Просунутий";
                } else if (percentage >= 50) {
                    level = "Середній";
                } else if (percentage >= 30) {
                    level = "Початківець";
                } else {
                    level = "Новачок";
                }
                
                $("#knowledge-level").text(level);
                $("#result-modal").fadeIn();
            }
            
            // Обробники подій
            $("#check-btn").on("click", function() {
                if ($("#translation-input").val().trim() !== "") {
                    checkAnswer();
                }
            });
            
            $("#translation-input").on("keypress", function(e) {
                if (e.which === 13 && $("#translation-input").val().trim() !== "") { // Enter key
                    checkAnswer();
                }
            });
            
            $("#next-btn").on("click", function() {
                nextWord();
            });
            
            $("#restart-btn").on("click", function() {
                $("#result-modal").fadeOut();
                initGame();
            });
            
            // Ініціалізація гри при завантаженні
            initGame();
        });