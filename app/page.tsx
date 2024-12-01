'use client'

import { useState } from 'react'
import { processAudio } from './utils/gemini'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lrcContent, setLrcContent] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setLrcContent(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an audio file')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await processAudio(file)
      setLrcContent(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const downloadLrc = () => {
    if (!lrcContent) return

    const blob = new Blob([lrcContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const fileName = file?.name
    const baseName = fileName?.substring(0, fileName.lastIndexOf('.')) || fileName
    a.download = `${baseName}.lrc`
    a.href = url

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">🎷 Song to Synced Lyrics 🎙️</h1>
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-600">Make AI extract synced lyrics. So you can sing your favorite songs.</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
            id="audio-input"
          />
          <label
            htmlFor="audio-input"
            className="cursor-pointer text-gray-600 hover:text-gray-800"
          >
            {file ? file.name : 'Click to select audio file'}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-2 px-4 rounded ${
            loading || !file
              ? 'bg-gray-400'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {loading ? 'Processing...' : 'Generate Lyrics'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {lrcContent && (
        <div className="mt-6 space-y-4">
          <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
            {lrcContent}
          </pre>
          <button
            onClick={downloadLrc}
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
          >
            Download Lyrics as LRC File
          </button>
        </div>
      )}
    </main>
  )
}
