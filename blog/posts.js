const blogPosts = [
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
    }

];

export default blogPosts;
