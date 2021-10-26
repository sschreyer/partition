# Written by Samuel Schreyer, 2021

# A simple app for creating and displaying lists of to-do items.

from Plan import Plan
from PlanType import PlanType

plans = []

def display_plans() -> None:
    """
        Return all plans as a JSON list 
        (note: will require changing the return type — correctly incorrect)
    """
    display = []
    for p in plans:
        display.append({
            'title': p.get_title(), 'description': p.get_description(), 
            'type': p.get_type()
        })

    print(display)

    return display

def delete_plan(p: Plan) -> None:
    """
        Delete a given plan from the list
    """
    pass

def make_plan(title: str, description: str, type: PlanType = None) -> Plan:
    """
        Make a Plan object with the given title and description 
        and add it to the list of plans. 
    """
    plan = Plan(title, description)
    plans.append(plan)
    return {}


