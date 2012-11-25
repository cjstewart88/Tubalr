require 'spec_helper'

describe "Playlist" do
  describe 'sorting' do
    before :each do
      @playlist = Playlist.new
      @video1 = Video.create(playlist: @playlist)
      @video2 = Video.create(playlist: @playlist)
      @video3 = Video.create(playlist: @playlist)
    end

    describe "re-ordering" do
      it "should not reorder previous tracks" do
        @playlist.reorder(@video3, 1)
        @video1.reload.track_number.should == 0
      end

      it "should reorder the ordered track" do
        @playlist.reorder(@video3, 1)
        @video3.reload.track_number.should == 1
      end

      it "should reorder the tracks following the ordered" do
        @playlist.reorder(@video3, 1)
        @video2.reload.track_number.should == 2
      end

      it "should list the tracks by track_number" do
        @playlist.reorder(@video2, 0)
        @playlist.reload.videos.first.id.should eq @video2.id
      end
    end
  end

end