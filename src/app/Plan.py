class Plan:
    def __init__(self, title: str, description: str):
        self.title = title
        self.description = description
    
    def get_title(self) -> str:
        return self.title

    def get_description(self) -> str:
        return self.description

