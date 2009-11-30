class WysihatFile < ActiveRecord::Base
  has_attached_file :file, :styles => { :medium => "300x300>", :thumb => "100x100>" }
  before_post_process :image?
  
  def image?
    !(file_content_type =~ /^image.*/).nil?
  end
  
end