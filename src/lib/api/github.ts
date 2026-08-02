export interface GitHubStats {
  username: string;
  followers: number | null;
  publicRepos: number | null;
  stars: number | null;
}

interface GitHubUserResponse {
  followers: number;
  public_repos: number;
}

interface GitHubRepoResponse {
  stargazers_count: number;
}

const TIMEOUT_MS = 4000;

async function fetchWithTimeout(url: string, headers: Record<string, string>): Promise<Response | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      headers,
      signal: controller.signal,
      next: { revalidate: 0 },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const username = process.env.GITHUB_USERNAME ?? "pankaj-109";
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const userUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

  const [userRes, reposRes] = await Promise.all([
    fetchWithTimeout(userUrl, headers),
    fetchWithTimeout(reposUrl, headers),
  ]);

  if (!userRes || !reposRes || !userRes.ok || !reposRes.ok) {
    return {
      username,
      followers: null,
      publicRepos: null,
      stars: null,
    };
  }

  try {
    const [userJson, reposJson] = await Promise.all([
      userRes.json() as Promise<GitHubUserResponse>,
      reposRes.json() as Promise<GitHubRepoResponse[]>,
    ]);

    const stars = Array.isArray(reposJson)
      ? reposJson.reduce((acc, repo) => acc + repo.stargazers_count, 0)
      : 0;

    return {
      username,
      followers: userJson.followers ?? null,
      publicRepos: userJson.public_repos ?? null,
      stars,
    };
  } catch {
    return {
      username,
      followers: null,
      publicRepos: null,
      stars: null,
    };
  }
}
