import axios from "@/services/axios.js";

/**
 * Generalized function to fetch lists from a given API path.
 * @param {string} apiPath - The API endpoint to fetch data from.
 * @param {Object} params - The parameters to pass to the API request.
 * @returns {Promise<Array>} - Returns the data array from the response.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function fetchList(apiPath, params) {
  try {
    const response = await axios.get(apiPath, { params });
    
    // 응답이 undefined인지 확인
    if (!response) {
      throw new Error(`No response received from ${apiPath}`);
    }
    
    // response.data가 undefined인지 확인
    if (response.data === undefined) {
      throw new Error(`No data received from ${apiPath}`);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${apiPath}:`, error);
    
    // 네트워크 오류인지 확인
    if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
      throw new Error(`네트워크 오류가 발생했습니다. 서버에 연결할 수 없습니다.`);
    }
    
    // 서버 오류인지 확인
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new Error(`API 엔드포인트를 찾을 수 없습니다: ${apiPath}`);
      } else if (status >= 500) {
        throw new Error(`서버 오류가 발생했습니다. (${status})`);
      } else {
        throw new Error(`API 요청 실패: ${error.response.data?.message || error.message}`);
      }
    }
    
    throw error;
  }
}
