from datetime import datetime
import hashlib


def assert_keys_in_form_exist(form, keys):
    """
    Check all the keys exist in the form.
    :param form: object form
    :param keys: required keys
    :return: True if all the keys exist. Otherwise return false.
    """
    if form is None:
        return False

    if type(form) is not dict:
        return False

    for key in keys:
        if key not in form.keys():
            return False

        value = form[key]
        if value == None:
            return False

    return True


def format_daterange(tr):
    start = datetime.strptime(tr[0] + ' 00:00:00', '%Y-%m-%d %H:%M:%S').isoformat()
    end = datetime.strptime(tr[1] + ' 23:59:59', '%Y-%m-%d %H:%M:%S').isoformat()
    return (start, end)


def encode_md5(_str):
    return hashlib.md5(str(_str).encode('utf-8')).hexdigest()


def pickup_md5(_str):
    res = _str.split('=')
    return res[0] if len(res) == 1 else res[1]
