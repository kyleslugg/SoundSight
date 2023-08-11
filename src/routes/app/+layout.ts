const getTopTracks = async (type: 'tracks') => {
  const topTracks = await fetch('/spotify/top/' + type, {
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json());

  return topTracks;
};
