from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.users.tencent_im import TencentIMClient

User = get_user_model()

class Command(BaseCommand):
    help = 'Bulk import all existing users to Tencent IM using the multiaccount_import API.'

    def handle(self, *args, **options):
        self.stdout.write("Fetching users from the database...")
        users = User.objects.all()
        
        # We will use the username as the Tencent IM identifier
        usernames = [user.username for user in users if user.username]
        total_users = len(usernames)
        
        if total_users == 0:
            self.stdout.write(self.style.WARNING("No users found to sync."))
            return

        self.stdout.write(f"Found {total_users} users. Starting sync process in batches of 100...")
        
        client = TencentIMClient()
        batch_size = 100
        success_count = 0
        fail_count = 0

        for i in range(0, total_users, batch_size):
            batch = usernames[i:i + batch_size]
            self.stdout.write(f"Syncing batch {i//batch_size + 1} ({len(batch)} users)...")
            
            result = client.multiaccount_import(batch)
            
            if result.get("ActionStatus") == "OK":
                success_count += len(batch)
                self.stdout.write(self.style.SUCCESS(f"Batch {i//batch_size + 1} imported successfully!"))
                
                # Some accounts might fail within a successful batch response depending on the API details.
                # Usually "FailAccounts" will list the failed identifiers.
                if "FailAccounts" in result and result["FailAccounts"]:
                    fail_accounts = result["FailAccounts"]
                    fail_count += len(fail_accounts)
                    success_count -= len(fail_accounts)
                    self.stdout.write(self.style.WARNING(f"Some accounts failed in this batch: {fail_accounts}"))
            else:
                fail_count += len(batch)
                error_info = result.get("ErrorInfo", "Unknown error")
                self.stdout.write(self.style.ERROR(f"Failed to import batch {i//batch_size + 1}. Error: {error_info}"))

        self.stdout.write(self.style.SUCCESS("\nSync Process Complete!"))
        self.stdout.write(f"Successfully synced: {success_count} users.")
        self.stdout.write(f"Failed to sync: {fail_count} users.")
        
        if fail_count > 0:
            self.stdout.write(self.style.WARNING("Please check your Tencent IM settings (.env) or the users' identifiers if there were failures."))
