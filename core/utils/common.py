from datetime import datetime


def format_daterange(tr):
    start = datetime.strptime(tr[0] + ' 00:00:00', '%Y-%m-%d %H:%M:%S').isoformat()
    end = datetime.strptime(tr[1] + ' 23:59:59', '%Y-%m-%d %H:%M:%S').isoformat()
    return (start, end)
