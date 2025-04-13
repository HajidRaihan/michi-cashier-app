function generateRandomId(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

export function generateTimeBasedId() {
  const timestamp = Date.now().toString(36); // base36 timestamp
  const random = generateRandomId(8); // shorter random part
  return `${timestamp}-${random}`;
}
