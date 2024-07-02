import TrackPlayer, {Event, RepeatMode, Track} from 'react-native-track-player';

export const PlayBackService = async () => {
  //   TrackPlayer.addEventListener(Event.RemotePause, () => {
  //     TrackPlayer.pause();
  //   });
  //   TrackPlayer.addEventListener(Event.RemotePlay, () => {
  //     TrackPlayer.play();
  //   });
  //   TrackPlayer.addEventListener(Event.RemotePrevious, () => {
  //     TrackPlayer.skipToPrevious();
  //   });
  //   TrackPlayer.addEventListener(Event.RemoteNext, () => {
  //     TrackPlayer.skipToNext();
  //   });
};

export const SetUpPlayer = async () => {
  let isSetupSuccessfull = false;
  try {
    await TrackPlayer.setupPlayer();
    isSetupSuccessfull = true;
  } catch (err) {
    isSetupSuccessfull = false;
  } finally {
    return isSetupSuccessfull;
  }
};

export const AddTrack = async (track: Track) => {
  await TrackPlayer.load(track);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
