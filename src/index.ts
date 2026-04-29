import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { DotenvObj  } from "src/utils/dotenv";

DotenvObj.getInstance()
const app = new Hono()

const welcomeStrings = [
  'Hello Hono!',
  'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono'
]
app.use(prettyJSON())
app.get('/', (c) => {
  return c.text(welcomeStrings.join('\n\n'))
})

export default app
