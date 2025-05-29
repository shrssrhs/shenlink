
export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const setName = 'lolemoji_by_EMOJI1'
  const result = await fetch(`https://api.telegram.org/bot${token}/getStickerSet?name=${setName}`)
  const json = await result.json()

  const stickers = json.result.stickers.slice(0, 50)
  const fileResults = await Promise.all(stickers.map(async (s) => {
    const file = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${s.file_id}`)
    const f = await file.json()
    return {
      ...s,
      file_path: f.result.file_path
    }
  }))

  res.status(200).json({ stickers: fileResults })
}