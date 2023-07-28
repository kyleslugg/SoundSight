export const getTrackDetails = async (id: string, access_token: string) => {
  const trackDetails = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  }).then((resp) => resp.json());

  return trackDetails;
};

export const getTrackAudioFeatures = async (
  id: string | string[],
  access_token: string
) => {
  let trackFeatures;
  if (typeof id === 'string') {
    trackFeatures = await fetch(
      `https://api.spotify.com/v1/audio-features/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      }
    ).then((resp) => resp.json());
  } else {
    trackFeatures = await fetch(
      `https://api.spotify.com/v1/audio-features?` +
        new URLSearchParams({ ids: id.join(',') }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      }
    ).then((resp) => resp.json());
  }

  return trackFeatures;
};

export const getTrackAudioAnalysis = async (
  id: string,
  access_token: string
) => {
  const trackAnalysis = await fetch(
    `https://api.spotify.com/v1/audio-analysis/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    }
  ).then((resp) => resp.json());

  return trackAnalysis;
};
