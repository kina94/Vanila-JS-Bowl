const API_URL = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/'

export const request = async (nodeId) => {
    // nodeId의 유무에 따라 디렉토리 검색인지 루트 검색인지 구분할 수 있음
    try {
        const res = await fetch(`${API_URL}/${nodeId ? nodeId : ""}`);
        if (!res.ok) throw new Error("서버의 상태가 이상합니다!");
        return await res.json();
    } catch (e) {
        throw new Error(`무엇인가 잘못 되었습니다. ${e.message}`);
    }
}