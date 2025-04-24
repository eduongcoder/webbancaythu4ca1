import { url } from "./Config";
export const PostApi = async ({path,body}) => {
    try {
      const response = await fetch(`${url}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.result;
      console.log('Kết quả tạo mới:', data.result);
  
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  export const ApiRequest = async ({ path, body, method = 'POST' }) => {
    try {
      const response = await fetch(`${url}${path}`, {
        method: method,  // Dynamically set the HTTP method (POST, PUT, etc.)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),  // Convert the body to JSON format
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.result;  // Return the result from the API
  
    } catch (error) {
      console.error('Lỗi:', error);  // Log any errors that occur
    }
  };
  
  export const GetApi = async ({path}) => {
    try {
      const response = await fetch(`${url}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.result;
  
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  export const PostGoogleLogin = async ({ email, avatar }) => {
    try {
      // Send the email and avatar to the backend for user creation or login
      const response = await fetch(`${url}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          avatar: avatar, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.result;
  
    } catch (error) {
      console.error('Lỗi:', error);
    }
};
  export const DeleteApi = async ({ path, id }) => {
    try {
      const response = await fetch(`${url}${path.replace("{id}", id)}`, {
        method: 'DELETE',  // HTTP method is DELETE
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.result; // Return the result, which will be `true` on success
  
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  