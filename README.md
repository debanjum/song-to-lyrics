# 🎷🎙️ Song to Lyrics

A minimal web app to extract timestamped lyrics in LRC format from any audio file using Google's Gemini AI.
Simply upload your audio file and Gemini will generate timestamped lyrics for your song. This can be downloaded as an LRC file to play with your song.

## Demo

Try it out at **https://debanjum.github.io/song-to-lyrics**.<br />
*The demo is free to use but rate-limited by the Gemini API quotas.*

<img width="600" alt="Screenshot of Website on 2024-12-01" src="https://github.com/user-attachments/assets/0ca000f2-611c-47cc-a063-0da3a3548b3e">


## Self Host

### Prerequisites

- Node.js (v20 or later)
- Yarn package manager
- Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/debanjum/song-to-lyrics.git
cd song-to-lyrics
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application locally.


## Development
This was an experiment to quickly build useful mini AI apps from scratch with AI.
It uses the fact that
1. Gemini API keys can be safely deployed client side for practical mini app scale use-cases. As:
   1. The free tier Gemini Flash API keys does not need billing. So no cost liability.
   2. The free tier has decent rate limits at 1500 RPD, 15RPM. So usable for mini apps.
   3. The Gemini API keys can be restricted for use from specific websites. So key cannot be used from anywhere else.
2. 90% of the work was to build the app was done by aider, claude sonnet and khoj.

The current experiment took me 3.5 hours to get a production deployment of the MVP. Most of the time was spent experimenting with aider, v0. Understanding Gemini API key restriction and creating workflow to deploy Next.js web app to Github pages via Github actions. So idea to production deployed MVP can be reduced to 2 hours in future iterations.

It'd be ideal if the process can be streamlined to go from idea to prototype, prototype to deployment and deployment to socialization in 3 hours total (1 hour per stage).

## License

MIT
