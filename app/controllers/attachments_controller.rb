class AttachmentsController < BaseController
  before_filter :find_source
  
  def index
    if @source
      @attachments = @source.attachments.all
    else
      @attachments = Attachment.all
    end
  end
  
  def show
    @attachment = @source.attachments.find(params[:id])
  end
  
  def new
    @attachment = @source.attachments.new
  end
  
  def create
    @attachment = @source.attachments.build(params[:attachment])
    if @attachment.save
      flash[:notice] = "Successfully created attachment."
      redirect_to @source
    else
      render :action => 'new'
    end
  end
  
  def edit
    @attachment = @source.attachments.find(params[:id])
  end
  
  def update
    @attachment = @source.attachments.find(params[:id])
    if @attachment.update_attributes(params[:attachment])
      flash[:notice] = "Successfully updated attachment."
      redirect_to @attachment
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @attachment = @source.attachments.find(params[:id])
    @attachment.destroy
    flash[:notice] = "Successfully destroyed attachment."
    redirect_to attachments_url
  end
  
  
  private

  def find_source
    params.each do |name, value|
      if name =~ /(.+)_id$/
        if $1 != "user"
          @source = $1.classify.constantize.find(value)
        else
          @source = $1.classify.constantize.find_by_login(value)
        end
        return
      end
    end
    nil
  end
end
