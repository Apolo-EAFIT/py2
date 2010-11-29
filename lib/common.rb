module Common
  # Creates an escaped regex from a string.
  def create_escaped_regexp(exp)
    Regexp.new(Regexp.escape(exp))
  end
end