import random
import requests
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

class TencentIMClient:
    """
    Client for interacting with the Tencent Cloud IM REST API.
    """
    
    def __init__(self):
        self.sdk_app_id = getattr(settings, 'TENCENT_IM_SDK_APP_ID', '')
        self.admin_identifier = getattr(settings, 'TENCENT_IM_ADMIN_IDENTIFIER', 'admin')
        self.user_sig = getattr(settings, 'TENCENT_IM_USER_SIG', '')
        self.base_url = "https://console.tim.qq.com/v4"
        
    def _build_url(self, service_name, command):
        """Constructs the API URL with required query parameters."""
        rand_val = random.randint(0, 4294967295)
        url = f"{self.base_url}/{service_name}/{command}"
        params = {
            "sdkappid": self.sdk_app_id,
            "identifier": self.admin_identifier,
            "usersig": self.user_sig,
            "random": rand_val,
            "contenttype": "json"
        }
        query_string = "&".join(f"{k}={v}" for k, v in params.items())
        return f"{url}?{query_string}"

    def multiaccount_import(self, accounts):
        """
        Imports multiple accounts to Tencent IM.
        :param accounts: list of strings (usernames or identifiers). Max length is 100.
        :return: dict response from the API
        """
        if not self.sdk_app_id or not self.user_sig:
            logger.error("Tencent IM credentials are not configured. Check settings.")
            return {"ActionStatus": "FAIL", "ErrorInfo": "Credentials not configured"}

        if not accounts:
            return {"ActionStatus": "FAIL", "ErrorInfo": "No accounts provided"}

        if len(accounts) > 100:
            logger.warning(f"multiaccount_import accepts max 100 accounts per request. Slicing the first 100 from {len(accounts)}.")
            accounts = accounts[:100]

        url = self._build_url("im_open_login_svc", "multiaccount_import")
        
        payload = {
            "Accounts": accounts
        }
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to import multiple accounts to Tencent IM: {e}")
            return {"ActionStatus": "FAIL", "ErrorInfo": str(e)}

    def account_import(self, identifier, nick="", face_url=""):
        """
        Imports a single account to Tencent IM.
        """
        if not self.sdk_app_id or not self.user_sig:
            return {"ActionStatus": "FAIL", "ErrorInfo": "Credentials not configured"}

        url = self._build_url("im_open_login_svc", "account_import")
        payload = {
            "Identifier": identifier,
        }
        if nick:
            payload["Nick"] = nick
        if face_url:
            payload["FaceUrl"] = face_url

        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to import single account to Tencent IM: {e}")
            return {"ActionStatus": "FAIL", "ErrorInfo": str(e)}
