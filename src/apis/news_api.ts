import axios from "axios";

interface NewsApi {
  country?: string;
  category?: string;
  language?: string;
  page?: string;
}

const useNewsApi = async ({
  country,
  category,
  language,
  page,
}: NewsApi = {}) => {
  try {
    let url = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA_API_KEY}`;
    if (country) url += `&country=${country}`;
    if (category) url += `&category=${category}`;
    if (language) url += `&language=${language}`;
    if (page) url += `&page=${page}`;

    const response = await axios({
      method: "get",
      url,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export default useNewsApi;
