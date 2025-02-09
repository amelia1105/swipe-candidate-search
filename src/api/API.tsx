const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "TOKEN_NOT_FOUND";

console.log("GitHub Token:", GITHUB_TOKEN); // Debugging

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log("Fetching GitHub users...");

    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: GITHUB_TOKEN !== "TOKEN_NOT_FOUND" ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
    });

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    return data;
  } catch (err) {
    console.error("An error occurred while fetching GitHub users:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
