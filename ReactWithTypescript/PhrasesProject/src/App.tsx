import { useState } from "react"
import './App.css'

import mindImg from './assets/mind-the-step.jpg'

function App() {
  const [phrase, setPhrase] = useState<string>("");
  const [selected, setSelected] = useState<number>(0);

  function handleSelection(e: number) {
    setSelected(e);
  }

  function generate() {
    let lucky = Math.floor(Math.random() * generatedPhrases[selected].phrases.length);
    setPhrase(generatedPhrases[selected].phrases[lucky])
  }

  const generatedPhrases = [
    {
      "id": 1,
      "category": "motivation",
      "phrases": [
        "Success is not the key to happiness. Happiness is the key to success.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Believe in yourself and all that you are.",
        "Your limitation—it's only your imagination.",
        "Dream it. Wish it. Do it.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Don’t stop when you’re tired. Stop when you’re done.",
        "Wake up with determination. Go to bed with satisfaction.",
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones."
      ]
    },
    {
      "id": 2,
      "category": "good morning",
      "phrases": [
        "Good morning! May your day be filled with positive thoughts and good vibes.",
        "Rise and shine! It’s a new day to chase your dreams.",
        "Every morning brings new opportunities. Have a fantastic day!",
        "Wishing you a day full of joyful moments and beautiful smiles. Good morning!",
        "Good morning! May today be kinder than yesterday and full of hope for tomorrow.",
        "Start your day with a smile and a positive mindset. Good morning!",
        "May this morning bring you peace and the energy to conquer your goals.",
        "Good morning! Make today another day to shine bright.",
        "Sending you a morning full of love, positivity, and motivation.",
        "May your coffee be strong and your day productive. Good morning!"
      ]
    },
    {
      "id": 3,
      "category": "good night",
      "phrases": [
        "Good night! May your dreams be sweet and your rest peaceful.",
        "As the day ends, let go of all your worries. Sleep well and recharge.",
        "Wishing you a restful night’s sleep and beautiful dreams. Good night!",
        "The stars are watching over you. Sleep tight and wake up refreshed.",
        "May your night be filled with peace and your dreams with happiness.",
        "Good night! Rest, recharge, and prepare for an amazing tomorrow.",
        "Sleep well and let your dreams guide you to a better tomorrow.",
        "Good night! Relax, unwind, and let go of all your stress.",
        "May the night bring you serenity and rest. Good night!",
        "Good night! Time to close your eyes and wake up to a fresh new day."
      ]
    }
  ]

  return (
    <>
      <main className="container">
        <img src={mindImg} alt="mid the step" className="image" />

        <h2 className="category">Categories</h2>
        <section className="category-area">
          {generatedPhrases.map((item, index) =>
            <button
              key={item.id}
              className="category-button"
              onClick={() => handleSelection(index)}
              style={{
                borderWidth: item.category === generatedPhrases[selected].category ? 2 : 0,
                borderColor: "#3f3fff"
              }}>
              {item.category}
            </button>
          )}

        </section>

        <button className="generate-button" onClick={() => generate()} >Generate Phrase</button>

        {phrase && <h2 className="generate-phrase">{phrase}</h2>}

      </main>
    </>
  )
}

export default App
