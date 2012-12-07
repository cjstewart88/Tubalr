require 'spec_helper'

describe "Video" do
  describe 'sorting' do
    before :each do
      @playlist = Playlist.new
      @video = Video.create(playlist: @playlist, video_id: 'abc')
    end

    it "should respond to #track_number" do
      @video.respond_to?(:track_number).should be_true
    end

    it "should default a track number when creating a playlist video" do
      @video.track_number.should == 0
    end

    it "should increment additional video track numbers as they're added" do
      video2 = Video.create(playlist: @playlist, video_id: 'def')
      video2.track_number.should == 1
    end
  end

end
