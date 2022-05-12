const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats";

export const api = async(keyword, type) => {
  try{
    const res = await fetch(`${API_ENDPOINT}/${ type ? `search?q=${keyword}` : keyword}`);
    return await res.json()
  } catch (e) {
    throw new Error('에러발생')
  }
}