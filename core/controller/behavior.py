from utils.common import *
import view.message as msg


def get_behavior(es, form):
    if not assert_keys_in_form_exist(form, ['behaviorType', 'endpointID', 'startDate',
                                            'endDate', 'pageSize', 'pageIndex']):
        return msg.error_msg("Invalid request.")

    startdate = form['startDate']
    enddate = form['endDate']
    behavior = form['behaviorType']
    eid = form['endpointID']
    page_index = int(form['pageIndex'])
    page_size = int(form['pageSize'])

    if behavior not in ['ProcessBehavior', 'NetworkBehavior', 'FileBehavior', 'RegistryBehavior']:
        return msg.error_msg('Undefined behavior type.')

    index = 'raw' + '-' + behavior.lower()
    ts_tr = format_daterange((startdate, enddate))

    result = es.query(_index=index, doctype='behavior', page_index=page_index, page_size=page_size, args={
        'bool': {
            'must': {
                'match': {
                    'endpoint.uuid': encode_md5(eid)
                }
            },
            'filter': {
                'range': {
                    'timestamp': {
                        'gte': ts_tr[0],
                        'lte': ts_tr[1]
                    }
                }
            }
        }
    })

    return msg.success_msg(result)
