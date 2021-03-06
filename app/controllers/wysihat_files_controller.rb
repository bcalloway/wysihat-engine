class WysihatFilesController < ApplicationController
  def index
    @wysihat_file = WysihatFile.new
    if params[:type] && params[:type] == "file"
      @wysihat_files = WysihatFile.file_content_type_not_like("image").all
    else
      @wysihat_files = WysihatFile.file_content_type_like("image").all
    end
    render :layout => false
  end
  
  def create
    @wysihat_file = WysihatFile.new(params[:wysihat_file])
    
    responds_to_parent do
      render :update do |page|
        if(@wysihat_file.save)
          page.insert_html :bottom, :wysihat_files, :partial => 'wysihat_file', :object => @wysihat_file  
        end
      end      
    end
  end
  
  def destroy
    @wysihat_file = WysihatFile.find(params[:id])
    respond_to do |wants|
      wants.js {
        render :update do |page|
          page.remove "wysihat_file_#{@wysihat_file.id}"
        end
      }
    end
    @wysihat_file.destroy
  end
end