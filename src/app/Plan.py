from PlanType import PlanType

class Plan:
    def __init__(self, title: str, description: str, type: PlanType = None):
        self.title = title
        self.description = description
        self.type = type 
    
    def get_title(self) -> str:
        return self.title

    def get_description(self) -> str:
        return self.description

    def get_type(self) -> str:
        # this could be better
        #print(type(self.type))
        if self.type != None:
            #print(type(self.type))
            return self.type.name
        return "None"

