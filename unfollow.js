import fetch from 'node-fetch'



var follwers = await fetch("https://i.instagram.com/api/v1/friendships/8542681467/following/?count=300", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"105\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-asbd-id": "198387",
        "x-csrftoken": "qwJXDjJoA3yaK16O3Rc5YZ0gEawFyUjt",
        "x-ig-app-id": "936619743392459",
        "x-ig-www-claim": "hmac.AR3DpFguNkFuJaIoi4y5Wc6O5vrROTJvD6URl60moWtZeZlM",
        "x-instagram-ajax": "1006179718",
        "cookie": "ig_nrcb=1; mid=Yqbj9gAEAAFHFX3vOnYDpa1KbWY_; ig_did=DF072672-127B-4877-A84A-C9E1601BFDD4; datr=RQ2nYoTMcrW-q2ydRxxG2PRu; fbm_124024574287414=base_domain=.instagram.com; dpr=2.5; shbid=\"10450\\0548447464191\\0541694109746:01f73e68f85a741233f0851db237c53876e9ffe61f8badafb051cd243e278f688f9295ba\"; shbts=\"1662573746\\0548447464191\\0541694109746:01f7b602d20dd9165e490cedafec84ac9d3f185406486ca036da22dd3e21b719f1af867d\"; fbsr_124024574287414=Kw3Mloxkff018G_J8KlaFCxwN0V0G_k_605peQ_-IAQ.eyJ1c2VyX2lkIjoiMTAwMDAyMDk0NTQ1MjA5IiwiY29kZSI6IkFRRElINXRlWVN2WGlIaFE0NEcxcUowYTFlRVYwVlRLd2ZxdlVucTdabXZWS3N1WGZkMjloazNsZDVDanQ3YjQzWWFRMEJpbW1wd0FPd1Mwb1MzSzdrUzFvWWVBaDdlaEpLNVBKNjh0dldfQzg5VnRBYU84d2o4Y0ViaEtqRWdLclZydFNfYVJJOTdwS1N1bm9YQ2FfRXJWVVFXSDNHNUZzUGl2bktoczVsb3A0T3E5SjNBRHF1M2tLRk83eHM2Ylpqa2Y0ekE4ZGV2YVBvVl9IanlmRHpCWjVBNnpxN2UtWEQ5WTU1WXdxRzhnS3pIYlFCT0doTEJ6VEt4V0lRSFVnRFZ2QVR3MWhIcW1qT1dmVFpMbjZxTUhDaFpVamhsMHc4TDdTakhsVlg4WlBzZFhGUHY5RnFYRFFDSk5vT2lOcDl6VjFRUzE1UWMyZDBRU2R3cGppaTVpIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQU5BY1BkT2Q3VzBGd3J2eTI1ZGNKa0ExalNnb3JRaThBWXN4NndXUGxEWkI0TTl3akFSRXM3V0Jsc0NWazF2eUlKMlNGWkF2VG0wVDZaQ3dORlVoTVM4c29kM0d3bVpBUE51d3hnaHZFYVpDbTJPaDRqRXpTSWZTWGhPY2xzM0tHdmJPTW1GR3A2enVIWkJ3TXVOYzdJY0RwWG5EWVk4R0lMNTEyRDdDYXoiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY2MjgwNjMwMX0; csrftoken=qwJXDjJoA3yaK16O3Rc5YZ0gEawFyUjt; ds_user_id=8542681467; sessionid=8542681467%3AEkeLPRp5Q6Fvfv%3A16%3AAYcUvorbuj2AqOM7ZItI0r3WAqGC-a0zoFnlt5Ir6Q; rur=\"EAG\\0548542681467\\0541694342489:01f73efb3f564df13a59370e971788eb6bf779f6cee9ebdeda7ba8b13174bcef2ace7c40\"",
        "Referer": "https://www.instagram.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

var json = await follwers.json()

json.users.forEach(async (user) => {

    await fetch(`https://i.instagram.com/api/v1/web/friendships/${user.pk}/unfollow/`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"105\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-asbd-id": "198387",
            "x-csrftoken": "qwJXDjJoA3yaK16O3Rc5YZ0gEawFyUjt",
            "x-ig-app-id": "936619743392459",
            "x-ig-www-claim": "hmac.AR3DpFguNkFuJaIoi4y5Wc6O5vrROTJvD6URl60moWtZeZlM",
            "x-instagram-ajax": "1006179718",
            "cookie": "ig_nrcb=1; mid=Yqbj9gAEAAFHFX3vOnYDpa1KbWY_; ig_did=DF072672-127B-4877-A84A-C9E1601BFDD4; datr=RQ2nYoTMcrW-q2ydRxxG2PRu; fbm_124024574287414=base_domain=.instagram.com; dpr=2.5; shbid=\"10450\\0548447464191\\0541694109746:01f73e68f85a741233f0851db237c53876e9ffe61f8badafb051cd243e278f688f9295ba\"; shbts=\"1662573746\\0548447464191\\0541694109746:01f7b602d20dd9165e490cedafec84ac9d3f185406486ca036da22dd3e21b719f1af867d\"; fbsr_124024574287414=Kw3Mloxkff018G_J8KlaFCxwN0V0G_k_605peQ_-IAQ.eyJ1c2VyX2lkIjoiMTAwMDAyMDk0NTQ1MjA5IiwiY29kZSI6IkFRRElINXRlWVN2WGlIaFE0NEcxcUowYTFlRVYwVlRLd2ZxdlVucTdabXZWS3N1WGZkMjloazNsZDVDanQ3YjQzWWFRMEJpbW1wd0FPd1Mwb1MzSzdrUzFvWWVBaDdlaEpLNVBKNjh0dldfQzg5VnRBYU84d2o4Y0ViaEtqRWdLclZydFNfYVJJOTdwS1N1bm9YQ2FfRXJWVVFXSDNHNUZzUGl2bktoczVsb3A0T3E5SjNBRHF1M2tLRk83eHM2Ylpqa2Y0ekE4ZGV2YVBvVl9IanlmRHpCWjVBNnpxN2UtWEQ5WTU1WXdxRzhnS3pIYlFCT0doTEJ6VEt4V0lRSFVnRFZ2QVR3MWhIcW1qT1dmVFpMbjZxTUhDaFpVamhsMHc4TDdTakhsVlg4WlBzZFhGUHY5RnFYRFFDSk5vT2lOcDl6VjFRUzE1UWMyZDBRU2R3cGppaTVpIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQU5BY1BkT2Q3VzBGd3J2eTI1ZGNKa0ExalNnb3JRaThBWXN4NndXUGxEWkI0TTl3akFSRXM3V0Jsc0NWazF2eUlKMlNGWkF2VG0wVDZaQ3dORlVoTVM4c29kM0d3bVpBUE51d3hnaHZFYVpDbTJPaDRqRXpTSWZTWGhPY2xzM0tHdmJPTW1GR3A2enVIWkJ3TXVOYzdJY0RwWG5EWVk4R0lMNTEyRDdDYXoiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY2MjgwNjMwMX0; csrftoken=qwJXDjJoA3yaK16O3Rc5YZ0gEawFyUjt; ds_user_id=8542681467; sessionid=8542681467%3AEkeLPRp5Q6Fvfv%3A16%3AAYcUvorbuj2AqOM7ZItI0r3WAqGC-a0zoFnlt5Ir6Q; rur=\"EAG\\0548542681467\\0541694342503:01f75f76a05a266cb09bd7bdb7a58b68702baf5b583b07a888e57858a4a98b538e5d81df\"",
            "Referer": "https://www.instagram.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "POST"
    });



})