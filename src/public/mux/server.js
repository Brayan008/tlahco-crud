let STREAM;

// Reads a state file looking for an existing Live Stream, if it can't find one,
// creates a new one, saving the new live stream to our state file and global
// STREAM variable.
const initialize = async () => {
  try {
    const stateFile = await readFile(stateFilePath, 'utf8');
    STREAM = JSON.parse(stateFile);
    console.log('Found an existing stream! Fetching updated data.');
    STREAM = await Video.LiveStreams.get(STREAM.id);
  } catch (err) {
    console.log('No stream found, creating a new one.');
    STREAM = await createLiveStream();
    await writeFile(stateFilePath, JSON.stringify(STREAM));
  }
  return STREAM;
}

// Starts the HTTP listener for our application.
// Note: glitch helpfully remaps HTTP 80 and 443 to process.env.PORT
initialize().then((stream) => {
  const listener = http.listen(process.env.PORT || 4000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
    console.log('HERE ARE YOUR STREAM DETAILS, KEEP THEM SECRET!');
    console.log(`Stream Key: ${stream.stream_key}`);
  });
});

// Creates a new Live Stream so we can get a Stream Key
const createLiveStream = async () => {
  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
    console.error("It looks like you haven't set up your Mux token in the .env file yet.");
    return;
  }

  // Create a new Live Stream!
  return await Video.LiveStreams.create({
    playback_policy: 'public',
    reconnect_window: 10,
    new_asset_settings: { playback_policy: 'public' }
  });
};