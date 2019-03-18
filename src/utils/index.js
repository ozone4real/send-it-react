import fetch from 'node-fetch';
import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'https://sendit03.herokuapp.com/api/v1',
  headers: {
    'x-auth-token': localStorage.getItem('token'),
  },
});

class Utils {
  static async httpRequest(url, method, token, payload) {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    return {
      status: response.status,
      responseData,
    };
  }

  static async sendHttpRequest(url, method, data) {
    const response = await apiInstance({
      url,
      method,
      data,
    });
    return response.data;
  }

  static formatDate(date) {
    return new Date(date)
      .toString()
      .split(' ')
      .slice(0, 5)
      .join(' ');
  }

  static paginate(currentPage, pageSize, movies) {
    const index = (currentPage - 1) * pageSize;
    return movies.slice(index, index + pageSize);
  }

  static removeModal(component) {
    component.setState({ modalContent: undefined });
  }

  static getPagedData(parcelData, component) {
    const { selectedCategory, currentPage, pageSize } = component.state;
    const filteredParcelData = selectedCategory.label === 'All parcels'
      ? parcelData
      : parcelData.filter(item => item.status === selectedCategory.value);
    const parcels = Utils.paginate(currentPage, pageSize, filteredParcelData);
    return { totalCount: filteredParcelData.length, data: parcels };
  }
}

export default Utils;
