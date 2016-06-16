import { audio, audioContext } from 'soundworks/client';

function getNearestIndexByValue(sortedArray, value, randomVar) {
  var size = sortedArray.length;
  var index = 0;

  if (size > 0) {
    var firstVal = sortedArray[randomVar].value;
    var lastVal = sortedArray[size - 1 - randomVar].value;

    if (value <= firstVal)
      index = randomVar;
    else if (value >= lastVal)
      index = size - 1 - randomVar;
    else {
      if (index < 0 || index >= size)
        index = Math.floor((size - 1) * (value - firstVal) / (lastVal - firstVal) + 0.5);

      while (sortedArray[index].value > value)
        index--;

      while (sortedArray[index + 1].value <= value)
        index++;

      if ((value - sortedArray[index].value) >= (sortedArray[index + 1].value - value))
        index++;
    }
  }

  index += (Math.floor(2 * randomVar * Math.random()) - randomVar);

  return sortedArray[index].index;
}

export default class BirdSynth {
  constructor(output, audioBuffer, markerArray) {
    this.engine = new audio.SegmentEngine();

    this.engine.periodAbs = 0;
    this.engine.periodRel = 0.5;
    this.engine.durationAbs = 0;
    this.engine.durationRel = 1;
    this.engine.offset = 0;
    this.engine.attackAbs = 0.005;
    this.engine.attackRel = 0.0;
    this.engine.releaseAbs = 0.0;
    this.engine.releaseRel = 0.25;
    this.engine.resamplingVar = 100;
    this.engine.gain = 1.0;

    this.engine.buffer = audioBuffer;
    this.engine.positionArray = markerArray.time;
    this.engine.durationArray = markerArray.duration;

    this.engine.connect(output);

    this.sortedMarkerIndices = markerArray.energy.map((value, index) => {
      return { value, index };
    }).sort((a, b) => a.value - b.value);
  }

  trigger(energy) {
    this.engine.segmentIndex = getNearestIndexByValue(this.sortedMarkerIndices, energy, 3);
    //this.engine.gain = energy * energy;
    this.engine.trigger();
  }
}
