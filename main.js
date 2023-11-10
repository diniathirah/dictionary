function searchWord() {
    var word = document.getElementById('searchInput').value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('result').innerHTML = `
          <h2>${data[0].word}</h2>
          <p>Part of speech: ${data[0].meanings[0].partOfSpeech}</p>
          <p>Meaning: ${data[0].meanings[0].definitions[0].definition}</p>
          <audio controls>
            <source src="${data[0].phonetics[0].audio}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        `;
        // Fetch synonyms and antonyms
        fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
          .then(response => response.json())
          .then(data => {
            var synonyms = data.map(word => word.word).join(', ');
            document.getElementById('result').innerHTML += `<p>Synonyms: ${synonyms}</p>`;
          })
          .catch(error => {
            console.error(error);
            alert('Error fetching synonyms. Please try again.');
          });
        
        fetch(`https://api.datamuse.com/words?rel_ant=${word}`)
          .then(response => response.json())
          .then(data => {
            var antonyms = data.map(word => word.word).join(', ');
            document.getElementById('result').innerHTML += `<p>Antonyms: ${antonyms}</p>`;
          })
          .catch(error => {
            console.error(error);
            alert('Error fetching antonyms. Please try again.');
          });
      })
      .catch(error => {
        document.getElementById('result').innerHTML = `
          <h2>Error</h2>
          <p>Could not find the word information. Please try again.</p>
        `;
      });
  }

  // Define a list of words
var wordList = ['example', 'dictionary', 'meaningful', 'learning', 'language'];

// Get a random word from the list
var wordOfTheDay = wordList[Math.floor(Math.random() * wordList.length)];

// Display the word of the day
document.getElementById('wordOfTheDay').innerText = `Word of the Day: ${wordOfTheDay}`;

  