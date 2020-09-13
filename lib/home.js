import { getDoc } from '../firebase/admin-functions'

export default async function() {
  const { home } = await getDoc('home', {path: ['customization']})
  if(!home.slides) return []
  return Object.values(home.slides).sort((a, b) => a.order - b.order)
}