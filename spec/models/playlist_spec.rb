require 'spec_helper'

describe "Playlist" do
  describe 'sorting' do
    before :each do
      @playlist = Playlist.new
      @video1 = Video.create(playlist: @playlist, video_id: 'abc')
      @video2 = Video.create(playlist: @playlist, video_id: 'def')
      @video3 = Video.create(playlist: @playlist, video_id: 'ghi')
      @id1 = @video1.video_id
      @id2 = @video2.video_id
      @id3 = @video3.video_id
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

    describe "bulk re-ordering" do
      it "should assign the tracks in a new order" do
        @playlist.reorder_tracks([@id2, @id3, @id1])
        @video1.reload.track_number.should == 2
        @video2.reload.track_number.should == 0
        @video3.reload.track_number.should == 1

        @playlist.reorder_tracks([@id3, @id2, @id1])
        @video1.reload.track_number.should == 2
        @video2.reload.track_number.should == 1
        @video3.reload.track_number.should == 0
      end

      it "should assign missing tracks to the end of the playlist" do
        @playlist.reorder_tracks([@id1, @id3])
        @video1.reload.track_number.should == 0
        @video2.reload.track_number.should == 2
        @video3.reload.track_number.should == 1
      end

      it "should fail gracefully for non-existant tracks" do
        @playlist.reorder_tracks([@id1, @id2, "invalid-id", @id3])
        @video1.reload.track_number.should == 0
        @video2.reload.track_number.should == 1
        @video3.reload.track_number.should == 2
      end
    end

  end

end
