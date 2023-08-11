<script lang="ts">
  import { Card, Button, Image, Center, Text } from '@svelteuidev/core';
  import Logo from './Spotify_Logo_RGB_Green.png';

  const cardStyle = {
    display: 'grid',
    'justify-content': 'center',
    'align-items': 'center',
    width: 'fit-content'
  };
</script>

<Card override={cardStyle} shadow="sm">
  <Text align="center">
    <h3>Login with Spotify</h3>
  </Text>

  <Button color="dark" size="xl" style="display: block">
    <Image src={Logo} height={40} />
  </Button>
</Card>
