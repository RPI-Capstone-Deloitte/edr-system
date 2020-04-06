from controller.behavior import *
from db.elastic import ES

form = {
    'behaviorType' : 'ProcessBehavior',
    'endpointID' : 'f999ac48f7421fa951545ce34f41a998',
    'startDate' : '2020-03-29',
    'endDate' : '2020-03-29',
    'pageSize' : '10',
    'pageIndex' : '1'
}

es = ES()

get_behavior(es, form)