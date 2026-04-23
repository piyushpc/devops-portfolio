const blogPosts = [
    {
    date: "2025-08-11",
    tag: "Docker, CI/CD, Infra",
    title: "Incorrect Image Version Deployed in Production",
    excerpt: "Production was running outdated containers due to use of 'latest' tag, causing mismatch between UAT-tested build and deployed version.",
    solution: "Implemented immutable versioning using dynamic tags passed via CI/CD pipeline and enforced strict image tagging in docker-compose.\n\n# docker-compose.yml\nservices:\n  pingacrm-api:\n    image: 152031363284.dkr.ecr.ap-south-1.amazonaws.com/pinga-api:${TAG}\n\n# Jenkins Deploy Step\necho \"TAG=${TAG}\" > .env\ndocker-compose down\ndocker-compose up -d\n\n# Result:\nEach deployment uses exact tested version (v1.X), enabling traceability and instant rollback.",
    image: "",
    link: "#"
    },
    {
        date: "2025-08-13",
        tag: "Docker, Storage, Data Safety",
        title: "Data Loss During Container Redeployment",
        excerpt: "User-uploaded GST files were getting lost when containers were recreated during deployments.",
        solution: "Decoupled application data from container lifecycle using Docker volumes and persistent host mapping.\n\n# docker-compose.yml\nservices:\n  pingacrm-api:\n    volumes:\n      - ./uploads:/app/wwwroot/uploads\n\n# Result:\nContainer recreation does not impact uploaded data, eliminating need for manual backup/restore steps.",
        image: "",
        link: "#"
    },
    {
        date: "2025-08-15",
        tag: "Security, Infra, SSH",
        title: "Insecure Direct Access to Production Server",
        excerpt: "Production server was initially accessed directly, exposing it to public network risks.",
        solution: "Implemented bastion host architecture with private subnet isolation and SSH proxying.\n\n# SSH via Bastion\nssh -i key.pem -J ubuntu@bastion-ip ubuntu@10.99.4.13\n\n# Jenkins Deployment Flow\nJenkins → Bastion → Private EC2 → Docker Deploy\n\n# Result:\nProduction server is no longer publicly accessible, improving security posture and compliance.",
        image: "",
        link: "#"
    },
    {
        date: "2025-08-17",
        tag: "Infra, Reliability, Cleanup",
        title: "Disk Space Exhaustion Causing Deployment Failures",
        excerpt: "Docker images and logs accumulated over time, filling disk space and causing deployment failures.",
        solution: "Automated disk cleanup using Docker prune and scheduled maintenance jobs.\n\n# Manual Cleanup\ndocker system prune -af\n\n# Cron Job (daily cleanup)\n0 2 * * * docker system prune -af\n\n# Optional Log Cleanup\nfind /home/ubuntu/PingaCRM/logs -type f -mtime +7 -delete\n\n# Result:\nMaintained healthy disk usage, preventing deployment interruptions.",
        image: "",
        link: "#"
    },
    {
        date: "2025-09-19",
        tag: "Config, DevOps, Architecture",
        title: "Configuration Dependency Inside Build Artifacts",
        excerpt: "Production configuration was tightly coupled with build artifacts (awscompiledcode), making updates risky and inflexible.",
        solution: "Externalized configuration from Docker image and mounted it at runtime for better flexibility.\n\n# docker-compose.yml\nservices:\n  pingacrm-api:\n    volumes:\n      - ./config/appsettings.Production.json:/app/appsettings.Production.json:ro\n\n# Folder Structure\nPingaCRM/\n├── config/\n│   └── appsettings.Production.json\n\n# Result:\nConfiguration can be updated independently without rebuilding images, enabling safer and faster changes.",
        image: "",
        link: "#"
    },
    {
        date: "2025.11.19",
        tag: "#Jenkins #Bastion #SSH #Tunnelling #AWS EC2 #DevSecOps #CI/CD",
        title: "Secure Jenkins-to-production tunnelling through a Bastion host without exposing private infrastructure",
        excerpt: "In our CI/CD pipeline, Jenkins needs to deploy directly to a private production server (10.x.x.x) that is not publicly reachable. The only network entry point into the private subnet is a Bastion host. The challenge was establishing a reliable SSH tunnel from Jenkins through the Bastion into the private server during automated deployments — without storing raw private keys in Jenkins credentials, without leaving long-lived tunnel processes orphaned on the Bastion, and without punching unnecessary inbound rules in the production security group. Any misconfiguration risks either a complete deployment failure or, worse, an unintended exposure of the private subnet to the internet.",
        solution: "1. SSH ProxyJump via Jenkins agent: Configured Jenkins to use SSH ProxyJump (-J bastion_user@bastion_ip) so the connection hops through the Bastion transparently in a single command — no manual tunnel pre-setup required.<br><br>2. Ephemeral SSH keys in AWS Secrets Manager: Private keys are stored in AWS Secrets Manager and injected at runtime into the Jenkins agent's ephemeral workspace, then deleted post-job. No keys are persisted in Jenkins credentials store.<br><br>3. Strict security group rules: The Bastion SG allows inbound port 22 only from the Jenkins agent's elastic IP. The production SG allows port 22 only from the Bastion's private IP — never from the public internet.<br><br>4. StrictHostKeyChecking + known_hosts: Both the Bastion and production host fingerprints are pre-seeded into a known_hosts file stored in Secrets Manager, preventing MITM during unattended pipeline runs.<br><br>5. Auto-closing tunnels: Used SSH -o ExitOnForwardFailure=yes and -o ServerAliveInterval flags so orphaned tunnel processes self-terminate if the Jenkins job fails or times out.",
        image: "../assets/uat-prod-cicd.png",
        link: "##"
    },
    {
        date: "2025.11.29",
        tag: "#docker #Kubernetes #AWS",
        title: "Container Crash After Deployment (Exit Code 139)",
        excerpt: "Containers start successfully but immediately crash, leading to restart loops and downtime.",
        solution: "Implement log inspection and health validation steps in the pipeline. Ensure required environment variables, dependencies, and file paths are validated before container startup. Add health checks to verify application readiness.",
        image: "",
        link: "#"
    },  
      {
        date: "2026.01.02",
        tag: "#AWS #Scaling #UAT #Production #Configuration",
        title: "works in UAT but fails in production",
        excerpt: "The Challenge: Application works in UAT but fails in production due to differences in configuration files (e.g., database connection strings, API keys, environment flags)",
        solution: "Externalize configuration from the application and manage it separately using environment variables or centralized config storage. Mount only the production config into the container and validate configs before deployment.",
        image: "",
        link: "#"
    },  
    {
        date: "2026.04.23",
        tag: "#AWS #Scaling",
        title: "Solving the 'Too Many Logs' Cost Crisis",
        excerpt: "The Challenge: CloudWatch costs were skyrocketing due to verbose logging from microservices.",
        solution: "Implemented an event-driven Lambda filtering pipeline to drop non-essential logs before ingestion, reducing costs by 40%.",
        image: "../assets/log-pipeline-arch.jpeg",
        link: "#"
    },
    {
        date: "2026.04.20",
        tag: "#Kubernetes #Observability",
        title: "Zero-Downtime Migration to EKS",
        excerpt: "The Challenge: Migrating production workloads from EC2 to Kubernetes without downtime.",
        solution: "Used a blue-green deployment strategy with Route53 weighted routing and a shared observability stack to ensure stability.",
        image: "../assets/observability-stack-arch.jpeg",
        link: "#"
    },
    {
        date: "2026.04.15",
        tag: "#Security #Automation",
        title: "Automating Threat Mitigation with Fail2Ban",
        excerpt: "The Challenge: Preventing brute-force attacks and malicious IP spam.",
        solution: "Integrated Fail2Ban with custom log rules and a Lambda function to automatically update security groups and block IPs.",
        image: "../assets/security-monitoring-arch.jpeg",
        link: "#"
    },
    {
        date: "2026.04.23",
        tag: "#Kubernetes #Monitoring",
        title: "Solving Data Latency in Multi-Region Clusters",
        excerpt: "Managing data latency in a multi-region Kubernetes setup was causing significant delays in critical applications, especially when handling real-time user requests. The geographical distribution of services across multiple regions led to inconsistent response times, which impacted user experience and performance for cloud-native applications. The root cause was traced back to inefficient communication between pods located in different regions, combined with inadequate monitoring that made it difficult to pinpoint the bottlenecks.",
        solution: "The Solution (Architectural Fix)<br>To tackle the latency issue, I implemented the following solution:<br><br>Network Optimization: We adopted a service mesh (Istio) for better traffic management, allowing us to intelligently route requests between regions based on latency metrics. The mesh also provided fine-grained control over retries, circuit breaking, and load balancing.<br><br>Kubernetes Cluster Federation: Implementing Kubernetes Federation allowed us to synchronize configurations and workloads across multiple regions, improving fault tolerance and ensuring that services in one region could be dynamically scaled based on demand in another region.<br><br>Latency Monitoring: I integrated Prometheus and Grafana to collect real-time metrics on latency between pods across regions. Alerts were configured for thresholds on response time, helping the operations team to quickly respond to any performance degradation.<br><br>Data Replication & Caching: To minimize cross-region data fetching, we used a distributed cache (Redis) and replicated critical data across regions. This significantly reduced the need for inter-region calls for frequently accessed data, lowering latency.<br><br>Impact<br><br>After implementing the solution, latency was reduced by over 30%, with real-time data processing and better resource distribution. The user experience improved, and we were able to scale our applications more effectively across regions.",
        image: "",
        link: "#"
    },
    {
        date: "2026-04-23",
        tag: "AWS, Cognito, Amplify, Next.js, API Gateway, Lambda, S3, CloudWatch, Serverless",
        title: "Cold Start Latency in Lambda Impacting API Response Time",
        excerpt: "The architecture relies on AWS Lambda (Node.js) behind API Gateway. During low traffic periods, Lambda functions go idle and introduce cold starts when invoked again. This causes increased latency (500ms–2s), impacting user experience in the Next.js application.",
        solution: "- Enable Provisioned Concurrency for critical Lambda functions.<br>- Optimize Lambda package size (use tree-shaking, remove unused dependencies).<br>- Use Lambda@Edge or CloudFront caching for frequently accessed endpoints.<br>- Consider splitting heavy functions into smaller micro-functions.<br>- Use API Gateway caching for read-heavy APIs.",
        image: "../assets/1753784735259.jpeg",
        link: "#"
    },
    {
        date: "2026-04-23",
        tag: "AWS, Cognito, Amplify, Next.js, API Gateway, Lambda, S3, CloudWatch, Serverless",
        title: "Cold Start Latency in Lambda Impacting API Response Time",
        excerpt: "The architecture relies on AWS Lambda (Node.js) behind API Gateway. During low traffic periods, Lambda functions go idle and introduce cold starts when invoked again. This causes increased latency (500ms–2s), impacting user experience in the Next.js application.",
        solution: "- Enable Provisioned Concurrency for critical Lambda functions.<br>- Optimize Lambda package size (use tree-shaking, remove unused dependencies).<br>- Use Lambda@Edge or CloudFront caching for frequently accessed endpoints.<br>- Consider splitting heavy functions into smaller micro-functions.<br>- Use API Gateway caching for read-heavy APIs.",
        image: "../assets/1753784735259.jpeg",
        link: "#"
    }

];

export default blogPosts;
