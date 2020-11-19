---
slug: authenticating-with-github
title: Authenticating with GitHub
date: 2019-11-02
author: MC
keywords:
    - git
    - GitHub
    - authentication
banner: ./images/banner.jpg
bannerCredit: Photo by MC
published: true
---

## Authenticating with GitHub Apps

You can authenticate as a GitHub App or as an installation.

### Generating a private key

After you create a GitHub App, you'll need to generate one or more private keys. You'll use the private key to sign access token requests.

You can create multiple private keys and rotate them to prevent downtime if a key is compromised or lost. To verify that a private key matches a public key, see **Verifying private keys**.

### Verifying private keys

GitHub generates a fingerprint for each private and public key pair using a SHA-1 hash function. You can verify that your private key matches the public key stored on GitHub by generating the fingerprint of your private key and comparing it to the fingerprint shown on GitHub.