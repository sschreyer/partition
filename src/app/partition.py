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

    return display

def delete_plan(title: str) -> None:
    """
        Delete a given plan from the list
    """
    plan_to_delete = None
    for p in plans:
        if p.get_title() == title:
            plan_to_delete = p
    
    if plan_to_delete is not None:
        plans.remove(p)

    return {}

def make_plan(title: str, description: str, type_: str = None) -> Plan:
    """
        Make a Plan object with the given title and description 
        and add it to the list of plans. 
    """
    # TODO: ensure only one plan with a given title can be created
    plan = Plan(title, description, type_)
    plans.append(plan)
    return {}


