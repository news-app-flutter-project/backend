import axios from "axios";

interface NewsApi {
  country: string;
  category: string;
  language: string;
  page: string;
}

const useNewsApi = async ({ country, category, language, page }: NewsApi) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA_API_KEY}&country=${country}&category=${category}&language=${language}&page=${page}`,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export default useNewsApi;
