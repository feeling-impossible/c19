import React from "react";
import Utils from "../Utils";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./Slider";

const sliderStyle = {
  position: "relative",
  width: "100%",
};

class SliderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      updated: 0,
    };
  }
  onUpdate = (values) => {
    let now = new Date().getTime();
    if (now - this.state.updated < this.state.delay) return;

    this.setState({ updated: now });
    this.props.save({
      start: this.props.values[values[0]],
      end: this.props.values[values[1]],
    });
  };
  onChange = (values) => {
    this.props.save({
      start: this.props.values[values[0]],
      end: this.props.values[values[1]],
    });
  };

  render() {
    let domain = [0, this.props.values.length - 1];
    let values = [
      this.props.values.map(Number).indexOf(+this.props.range.start),
      this.props.values.map(Number).indexOf(+this.props.range.end),
    ];

    return (
      <div className="mx-auto pb-4" style={{ width: this.props.width }}>
        <div className="mb-3 textLarger textCenter">Trendline Date Range</div>
        <div className="px-2" style={{ height: 50 }}>
          <Slider
            mode={2}
            step={1}
            domain={domain}
            rootStyle={sliderStyle}
            onUpdate={this.onUpdate}
            onChange={this.onChange}
            values={values}
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map((handle) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={domain}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks left={false} right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
            <Ticks count={Math.floor(this.props.values.length / 3)}>
              {({ ticks }) => (
                <div className="slider-ticks">
                  {ticks.map((tick) => {
                    tick.label = Utils.displayDate(
                      this.props.values[tick.value]
                    );
                    return (
                      <Tick key={tick.id} tick={tick} count={ticks.length} />
                    );
                  })}
                </div>
              )}
            </Ticks>
          </Slider>
        </div>
      </div>
    );
  }
}

export default SliderWrapper;
