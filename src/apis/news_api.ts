import axios from "axios";
import convertKorean from "@/utils/convertUtf";

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

    const { data } = response;

    if (data.results.length !== 0) {
      const convertedData = data.results.map((newsItem: any) => {
        if (newsItem.content !== null) {
          const convertedContent = convertKorean(newsItem.content);
          return { ...newsItem, content: convertedContent };
        } else {
          return { ...newsItem };
        }
      });
      return { ...data, results: convertedData };
    } else {
      return data;
    }
  } catch (error) {
    return error;
  }
};

export default useNewsApi;
