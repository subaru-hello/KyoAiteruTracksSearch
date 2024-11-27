import os
import io
import boto3


class R2:
    def __init__(self, bucket):
        # Firebase Config から R2 の情報を取得
        self.endpoint = os.environ.get("R2_ENDPOINT")
        self.access_key_id = os.environ.get("R2_ACCESS_KEY_ID")
        self.secret_access_key = os.environ.get("R2_SECRET_ACCESS_KEY")
        self.bucket = bucket

        # 必須項目が設定されているか確認
        if not all([self.endpoint, self.access_key_id, self.secret_access_key]):
            raise ValueError("R2設定が不完全です。")

        # boto3 セッションの初期化
        self.s3_client = boto3.client(
            service_name="s3",
            endpoint_url=self.endpoint,
            aws_access_key_id=self.access_key_id,
            aws_secret_access_key=self.secret_access_key,
            region_name="auto",  # Must be one of: wnam, enam, weur, eeur, apac, auto
        )

    # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/put_object.html
    def put_object(self, data, key: str):
        """
        R2にデータをアップロードする
        """
        try:
            # データをアップロード
            response = self.s3_client.put_object(Body=data, Bucket=self.bucket, Key=key)

            print("アップロード成功:", response)
            return response
        except Exception as e:
            print(f"アップロードエラー: {e}")
            return None

    def list_buckets(self):
        try:
            response = self.s3_client.list_buckets()
            print("バケット一覧:", response["Buckets"])
        except Exception as e:
            print(f"バケット取得エラー: {e}")

    def generate_presigned_url(self, key, operation="put_object", expiration=3600):
        """
        事前署名URLを生成する
        :param key: S3 オブジェクトキー（ファイルパス）
        :param operation: 操作タイプ ("get_object" or "put_object")
        :param expiration: URL の有効期限（秒単位、デフォルト: 3600秒 = 1時間）
        :return: 事前署名URL
        """
        try:
            url = self.s3_client.generate_presigned_url(
                ClientMethod=operation,
                Params={
                    "Bucket": self.bucket,
                    "Key": key,
                },
                ExpiresIn=expiration,
            )
            print("url=", url)
            return url
        except Exception as e:
            print(f"認証エラー: {e}")
            return None
