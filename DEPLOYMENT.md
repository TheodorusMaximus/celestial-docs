# Deployment Setup Guide

This repository uses GitHub Actions for automated deployment to Netlify with integrated Lighthouse performance testing.

## 🚀 Setup Instructions

### 1. GitHub Repository Secrets

You need to configure the following secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:

#### Required Secrets:

- **`NETLIFY_AUTH_TOKEN`**: Your Netlify personal access token
  - Get this from: [Netlify User Settings → Applications → Personal access tokens](https://app.netlify.com/user/applications#personal-access-tokens)
  - Click "New access token" and copy the generated token

- **`NETLIFY_SITE_ID`**: Your Netlify site ID
  - Get this from: Netlify dashboard → Your site → **Site settings** → **General** → **Site details**
  - Copy the "Site ID" value

### 2. How to Get Netlify Credentials

#### Getting your Netlify Auth Token:
```bash
# Option 1: Use Netlify CLI (if installed)
netlify login
netlify env:list

# Option 2: Manual from Netlify dashboard
# 1. Go to https://app.netlify.com/user/applications
# 2. Click "New access token"
# 3. Give it a name like "GitHub Actions"
# 4. Copy the token
```

#### Getting your Netlify Site ID:
```bash
# Option 1: Use Netlify CLI in your project directory
netlify status

# Option 2: From Netlify dashboard
# 1. Go to your site dashboard
# 2. Site settings → General
# 3. Copy the "Site ID"
```

## 🔄 Automated Workflows

### 1. Main Deployment (`deploy.yml`)
- **Trigger**: Push to `main` branch
- **Actions**: 
  - Build the site
  - Run Lighthouse performance tests
  - Deploy to production
  - Comment results on commits

### 2. PR Preview (`pr-preview.yml`)
- **Trigger**: Pull request opened/updated
- **Actions**:
  - Build the site
  - Deploy preview to Netlify
  - Run Lighthouse on preview
  - Comment preview URL on PR

### 3. Performance Monitoring (`lighthouse-check.yml`)
- **Trigger**: Weekly schedule (Sundays 2 AM UTC) + manual
- **Actions**:
  - Test live site performance
  - Create GitHub issue if performance degrades

## 📊 Lighthouse Configuration

### Performance Thresholds:
- **Performance**: 80% (warning)
- **Accessibility**: 70% (warning)  
- **Best Practices**: 90% (warning)
- **SEO**: 80% (warning)

### Configuration Files:
- `lighthouserc.json`: For build-time testing
- `lighthouserc-live.json`: For live site monitoring

## 🛠 Manual Deployment

If you need to deploy manually:

```bash
# Build the site
npm run build

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod --dir=dist
```

## 🔍 Monitoring

- **Performance Reports**: Available in GitHub Actions artifacts
- **Live Site Monitoring**: Weekly automated checks
- **PR Previews**: Automatic preview deployments for all PRs

## 🚨 Troubleshooting

### Common Issues:

1. **"NETLIFY_AUTH_TOKEN not found"**
   - Verify the secret is correctly set in GitHub repository settings
   - Ensure the token has not expired

2. **"Site not found"**
   - Check that `NETLIFY_SITE_ID` matches your actual site ID
   - Verify the site exists in your Netlify account

3. **Build failures**
   - Check the GitHub Actions logs for specific error messages
   - Ensure all dependencies are properly listed in `package.json`

4. **Lighthouse failures**
   - Review performance thresholds in `lighthouserc.json`
   - Check if the site is accessible during testing

### Getting Help:

- Check GitHub Actions logs for detailed error messages
- Review Netlify deploy logs in the Netlify dashboard
- Ensure all secrets are properly configured

## 📈 Performance Optimization Tips

- Optimize images using Astro's built-in image optimization
- Minimize JavaScript bundle sizes
- Use proper caching headers
- Optimize web fonts loading
- Monitor Core Web Vitals regularly
