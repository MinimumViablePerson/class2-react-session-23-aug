import { useEffect, useState } from 'react'
import './App.css'

function playDrumSound () {
  const audio = new Audio('./drum.mp3')
  audio.play()
}

const music = new Audio()

function playMusic () {
  if (music.paused) {
    music.play()
  } else {
    music.pause()
  }
}

export default function App () {
  const [items, setItems] = useState([
    {
      id: 1,
      thumbnail: 'https://picsum.photos/300/150?A',
      title: 'A'
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/300/150?B',
      title: 'B'
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/300/150?C',
      title: 'C'
    },
    {
      id: 4,
      thumbnail: 'https://picsum.photos/300/150?D',
      title: 'D'
    },
    {
      id: 5,
      thumbnail: 'https://picsum.photos/300/150?E',
      title: 'E'
    },
    {
      id: 6,
      thumbnail: 'https://picsum.photos/300/150?F',
      title: 'F'
    }
  ])

  const [songs, setSongs] = useState([
    {
      title: 'Goldn',
      source:
        'https://cdn.pixabay.com/download/audio/2022/08/04/audio_2dde668d05.mp3?filename=goldn-116392.mp3'
    },
    {
      title: 'Inspiring Cinematic Ambient',
      source:
        'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=inspiring-cinematic-ambient-116199.mp3'
    },
    {
      title: 'Lofi Study',
      source:
        'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
    }
  ])

  const [selectedIndex, setSelectedIndex] = useState(0)

  function previous () {
    playDrumSound()
    let newIndex = selectedIndex === 0 ? items.length - 1 : selectedIndex - 1
    setSelectedIndex(newIndex)
  }

  function next () {
    playDrumSound()
    let newIndex = selectedIndex === items.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(newIndex)
  }

  useEffect(() => {
    const item = items[selectedIndex]
    const itemEl = document.querySelector(`#item-${item.id}`)
    if (itemEl) itemEl.scrollIntoView({ inline: 'center' })
  }, [items, selectedIndex])

  // useEffect(() => {
  //   const intervalId = setInterval(next, 5000)
  //   return () => clearInterval(intervalId)
  // }, [next])

  return (
    <div className='App'>
      {songs.map(song => (
        <button
          onClick={() => {
            music.src = song.source
            playMusic()
          }}
        >
          {song.title}
        </button>
      ))}
      <button onClick={playMusic}>PLAY/PAUSE MUSIC</button>
      <div className='scroller'>
        {items.map((item, index) => (
          <article
            onClick={() => {
              playDrumSound()
              setSelectedIndex(index)
            }}
            key={item.id}
            className={`scroll-item ${
              selectedIndex === index ? 'selected' : ''
            }`}
            id={`item-${item.id}`}
          >
            <img src={item.thumbnail} alt='' />
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
      <nav>
        <button onClick={previous}>˂</button>
        <button onClick={next}>˃</button>
        <button onClick={() => setSelectedIndex(0)}>GO BACK TO FIRST</button>
        <button onClick={() => setSelectedIndex(items.length - 1)}>
          GO TO THE END
        </button>
      </nav>
    </div>
  )
}
