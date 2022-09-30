import fetch from 'node-fetch'



var follwers = await fetch("https://i.instagram.com/api/v1/friendships/8542681467/following/?count=200", {
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
    "x-csrftoken": "ATyt2mL34HKaZxTmgRuCKdoT4ZyOTR3w",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR24wR_VUVv1fn1tC5fefxoL9BMfXltnklJmoDSI2ZqEOq2a",
    "x-instagram-ajax": "1006189483",
    "cookie": "ig_nrcb=1; mid=Yqbj9gAEAAFHFX3vOnYDpa1KbWY_; ig_did=DF072672-127B-4877-A84A-C9E1601BFDD4; datr=RQ2nYoTMcrW-q2ydRxxG2PRu; fbm_124024574287414=base_domain=.instagram.com; dpr=2.5; shbid=\"6002\\0548542681467\\0541694379980:01f72975e48fa3c6a4418cbdfffceee799fb279d8b167e3709237cd3171e83bfc212b0d3\"; shbts=\"1662843980\\0548542681467\\0541694379980:01f7511bcd2ac7dbbc13d316219bfb2ffe7be980a57f84271190ec485b6071337001af15\"; fbsr_124024574287414=FqfMHh6KPqgl67kyLFe-6rfbwr8eZU3WMXW3qr-Sn4w.eyJ1c2VyX2lkIjoiMTAwMDAyMDk0NTQ1MjA5IiwiY29kZSI6IkFRQVN6RjZfMGtlSUxoQ3Zfdlo5MC1ZdUsyX3VXdmI4Zk5NcHV0QWpQZWttUDR2T2IydW11b1FHR3g4RDQxN3ZhU0NFVHlXMldaek40eEdjOXhnVU9zUG5RUHNWZW93bnJoUHJ0RFp0WVlpeUtSelV3aWpIQTI2M3o5SjBWWnNaaC1DZnMtdHV0Sm1CeExkRU92S3JNYm01ZS03S21ZVkE2Z1lnTjZOb2VKRHpqZzNzUDZuakZFa214MEZTb09OelJlSThNTk9adHFoejBodFoyUEU1TWZrS3lRUEtyN0ZwMXdvZDJHX1daVldMNGVJTmp3aWV6R0NEX1NfTDNvUjFOc3NaeVVtOEk2NkJ6V2RuOExoTGNWWTBCblRZcl9scVJ1TTYxaUtPNDdlTWtwVTlVSWlud0Rlb19qRXdXSmtxWEs4WUx4QmxBcE1vS3h1ckRUMXd5cmRKIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJ0a0xIS1BFUGY0QjhjdTFrYU45UHpjU0laQ1lSSUtyYmNtaFJZUnhYM3FmU3llOHpGS1pDdGlCc2RaQnh5N29MU29jQ200U0pIZ2NxWFpDbEhlWHhpR3hEWkNDTXZPeTZzdlE2YTFaQkdHZ2pSUFpCb1BaQkFUWTZkRGZ1UUYweDNITHQ2UjJpdGJGUEU3WkFUcFpDcnRaQUs2Q2FONlgwaUJ1MFk4b3hGNWRlVSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjYzMDczMDIzfQ; csrftoken=ATyt2mL34HKaZxTmgRuCKdoT4ZyOTR3w; ds_user_id=8542681467; sessionid=8542681467%3ATBC011aCzaF3Bv%3A3%3AAYcYHuOMp4m-bvUM9kn1RB69bOQsKdfUnXvf8TcD_A; rur=\"EAG\\0548542681467\\0541694609138:01f7c39cdaa0dfef397bd8e0aec34f1675541643a6e5f3378483a4ef2c4dda839f5348b7\"",
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
          "x-csrftoken": "fGsDjUX7K4sQisnHUrCEjyECgiNqhvnq",
          "x-ig-app-id": "936619743392459",
          "x-ig-www-claim": "hmac.AR24wR_VUVv1fn1tC5fefxoL9BMfXltnklJmoDSI2ZqEOh4x",
          "x-instagram-ajax": "1006180106",
          "cookie": "ig_nrcb=1; mid=Yqbj9gAEAAFHFX3vOnYDpa1KbWY_; ig_did=DF072672-127B-4877-A84A-C9E1601BFDD4; datr=RQ2nYoTMcrW-q2ydRxxG2PRu; fbm_124024574287414=base_domain=.instagram.com; dpr=2.5; shbid=\"6002\\0548542681467\\0541694379980:01f72975e48fa3c6a4418cbdfffceee799fb279d8b167e3709237cd3171e83bfc212b0d3\"; shbts=\"1662843980\\0548542681467\\0541694379980:01f7511bcd2ac7dbbc13d316219bfb2ffe7be980a57f84271190ec485b6071337001af15\"; fbsr_124024574287414=FqfMHh6KPqgl67kyLFe-6rfbwr8eZU3WMXW3qr-Sn4w.eyJ1c2VyX2lkIjoiMTAwMDAyMDk0NTQ1MjA5IiwiY29kZSI6IkFRQVN6RjZfMGtlSUxoQ3Zfdlo5MC1ZdUsyX3VXdmI4Zk5NcHV0QWpQZWttUDR2T2IydW11b1FHR3g4RDQxN3ZhU0NFVHlXMldaek40eEdjOXhnVU9zUG5RUHNWZW93bnJoUHJ0RFp0WVlpeUtSelV3aWpIQTI2M3o5SjBWWnNaaC1DZnMtdHV0Sm1CeExkRU92S3JNYm01ZS03S21ZVkE2Z1lnTjZOb2VKRHpqZzNzUDZuakZFa214MEZTb09OelJlSThNTk9adHFoejBodFoyUEU1TWZrS3lRUEtyN0ZwMXdvZDJHX1daVldMNGVJTmp3aWV6R0NEX1NfTDNvUjFOc3NaeVVtOEk2NkJ6V2RuOExoTGNWWTBCblRZcl9scVJ1TTYxaUtPNDdlTWtwVTlVSWlud0Rlb19qRXdXSmtxWEs4WUx4QmxBcE1vS3h1ckRUMXd5cmRKIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJ0a0xIS1BFUGY0QjhjdTFrYU45UHpjU0laQ1lSSUtyYmNtaFJZUnhYM3FmU3llOHpGS1pDdGlCc2RaQnh5N29MU29jQ200U0pIZ2NxWFpDbEhlWHhpR3hEWkNDTXZPeTZzdlE2YTFaQkdHZ2pSUFpCb1BaQkFUWTZkRGZ1UUYweDNITHQ2UjJpdGJGUEU3WkFUcFpDcnRaQUs2Q2FONlgwaUJ1MFk4b3hGNWRlVSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjYzMDczMDIzfQ; csrftoken=ATyt2mL34HKaZxTmgRuCKdoT4ZyOTR3w; ds_user_id=8542681467; sessionid=8542681467%3ATBC011aCzaF3Bv%3A3%3AAYcYHuOMp4m-bvUM9kn1RB69bOQsKdfUnXvf8TcD_A; rur=\"EAG\\0548542681467\\0541694609138:01f7c39cdaa0dfef397bd8e0aec34f1675541643a6e5f3378483a4ef2c4dda839f5348b7\"",
          "Referer": "https://www.instagram.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "POST"
      });



})