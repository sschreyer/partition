from PlanType import PlanType

class Plan:
    def __init__(self, title: str, description: str, type_: str = None):
        self.title = title
        self.description = description
        # TODO: convert this to a PlanType
        self.type = type_
    
    def get_title(self) -> str:
        return self.title

    def get_description(self) -> str:
        return self.description

    def get_type(self) -> str:
        # this could be better
        if self.type != None:
            return self.type
        return "None"

